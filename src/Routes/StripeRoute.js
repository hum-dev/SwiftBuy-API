import { stripeCheckout} from "../Controllers/StripeController.js"

const stripe = (app) => {
    app.route('/stripe')
    .post(stripeCheckout)
}

export default stripe