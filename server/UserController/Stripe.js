const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 
require("dotenv").config(); 

exports.user= async (req, res) => {
    try {      
        const { 
            amount, 
            currency, 
            description, 
            "customer email": customerEmail 
        } = req.body;
        if (!amount || amount<0) {
            return res.status(400).json({ 
                status: "error", 
                message: "Amount must be at least 6000 (₹6.00) to clear Stripe minimums." 
            });
        }
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: customerEmail, 
            line_items: [
                {
                    price_data: {
                        currency: currency || 'inr',
                        product_data: {
                            name: 'Ashu Enterprises - Order',
                            description: description, 
                        },
                         unit_amount: amount, 
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            
            metadata: {
                order_description: description || "No description provided"
            },
            success_url: 'http://localhost:5173/dashboard',
            cancel_url: 'http://localhost:5173/cancel',
        });
        res.json({ 
            status: "success", 
            payment_url: session.url, 
            id: session.id 
        });

    } catch (err) {
        console.error("Stripe Error:", err.message);
        res.status(500).json({ 
            status: "error", 
            message: err.message 
        });
    }
};
exports.ashu=async (req, res) => {
    const { session_id } = req.query;
    if (!session_id) return res.status(400).json({ error: "No session_id" });

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        if (session.payment_status === 'paid') {
            res.json({ msg: "success", status: session.payment_status });
        } else {
            res.status(400).json({ msg: "Payment not completed" });
        }
    } catch (err) { 
        res.status(500).json({ error: err.message });
    }
};




