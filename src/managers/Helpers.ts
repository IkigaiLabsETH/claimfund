export class Helpers {

    static async sleep(seconds: number) {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }
 
    static getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getProbability(winProbability: number): boolean {
        return this.getRandomInt(1, 10000) <= winProbability * 100;
    }   

    static padNumber(d: number): string {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

    static numberWithCommas(x: number) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    static truncateString(str: string, len: number): string {
        if (str.length <= len) { return str; }

        const n = Math.floor(len / 2);

        const subString1 = str.slice(0, n); 
        const subString2 = str.slice(str.length-n, str.length); 

        return subString1 + "..." + subString2;
    }

    static shuffleArray(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    static differenceInSeconds(date1: Date, date2: Date): number {
        const difference = Math.abs(date1.getTime() - date2.getTime());
        return Math.floor(difference / 1000);
    }

    static formatNumber(num: number): string {
        let formatter = Intl.NumberFormat('en', { notation: 'compact' });
        return formatter.format(num);
    }

}