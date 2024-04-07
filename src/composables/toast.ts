import { useToast } from "vue-toast-notification";

export const showToast = (msg: string, type = "success", dur = 3000) => {
    console.log('showToast', msg, type);
    return useToast().open({
        message: msg,
        type: type,
        duration: dur
    });
}