import aws from "aws-sdk";
import axios from "axios";
import { fromBuffer } from "file-type";
import { Environment } from "../../models/types";

export class StorageManager {

    static async uploadImage(userId: string, buffer: Buffer): Promise<string | undefined> {
        try {
            const fileType = await fromBuffer(buffer);
            const contentType = fileType?.mime || 'image/png';
     
            const s3 = new aws.S3({
                endpoint: process.env.SPACES_ENDPOINT,
                accessKeyId: process.env.SPACES_ACCESS_KEY_ID,
                secretAccessKey: process.env.SPACES_ACCESS_KEY_SECRET,
            });
    
            const isProd = process.env.ENVIRONMENT == Environment.PRODUCTION;
            const hash = new Date().getTime().toString();
            const filename = `${isProd ? 'files/' : 'files_dev/'}${userId}/${hash}`;        
            const data = await s3.upload({ 
                Bucket: "images.sololabs.io", 
                ACL: "public-read", 
                ContentType: contentType,
                Key: filename, 
                Body: buffer,
            }, { partSize: 10 * 1024 * 1024, queueSize: 10 }).promise();

            if (data){
                const imageUrl = `https://images.sololabs.io/${filename}`;
                return imageUrl;
            }
        }
        catch (err){
            console.log('StorageManager', 'uploadAvatar', err);
        }

        return undefined;
    }

    static async downloadFile(url: string): Promise<Buffer> {
        const res = await axios.get(url, { responseType: 'arraybuffer' });
        return Buffer.from(res.data, 'binary');
    }

}