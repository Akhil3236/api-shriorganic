import Notify from "../models/notifyModel.js";
import { sendOrderUpdateEmail } from "../utils/sendEmail.js";


// by email id subscribe to the news letter[Website]
export const subscribeToNewsletter = async (req, res) => {
    try {
        const { email } = req.body;
        const notify = new Notify({ email });
        await notify.save();

        await sendOrderUpdateEmail(email, "Subscribed to newsletter successfully", `You have successfully subscribed to our newsletter.`);
        res.status(200).json({
            success: true,
            message: "Subscribed to newsletter successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Failed to subscribe to newsletter",
            error: error.message
        });
    }
}

// unsubscribe from the news letter
export const unsubscribeFromNewsletter = async (req, res) => {
    try {
        const { email } = req.body;
        const notify = await Notify.findOneAndDelete({ email });
        res.status(200).json({
            success: true,
            message: "Unsubscribed from newsletter successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Failed to unsubscribe from newsletter",
            error: error.message
        });
    }
}
