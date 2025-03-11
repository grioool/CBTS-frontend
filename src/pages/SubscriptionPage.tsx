import React, {useState} from 'react';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubscriptionPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [subscriptionType, setSubscriptionType] = useState<'Premium' | 'Enterprise'>('Premium');

    const handleSubscription = async () => {
        setLoading(true);
        try {
            const response = await axios.post('https://cbts-backend-854061077838.europe-central2.run.app/subscription', {subscriptionType});
            const stripeUrl = response.data.stripeUrl;
            toast.success(`Redirecting to Stripe for ${subscriptionType} subscription...`);

            window.location.href = stripeUrl;
        } catch (error: any) {
            console.error('Subscription error:', error);
            const errorCode = error.response?.status;
            const errorMessage =
                error.response?.data?.message || 'An error occurred during subscription';
            toast.error(`Error ${errorCode || ''}: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <ToastContainer/>
            <h1 className="text-xl font-bold mb-4">Choose Your Subscription</h1>

            <p className="mb-4">
                Upgrade your account to unlock enhanced summarization features and increased limits.
                <br/><br/>
                As a <strong>Registered</strong> user, you can summarize up to 5 documents per day with a maximum file
                size of 5MB.
                <br/><br/>
                Upgrade to a <strong>Premium</strong> subscription for up to 50 summarizations and 50MB file size, or
                choose the <strong>Enterprise</strong> plan for high-load summarization with up to 200 summarizations
                and 500MB file size.
            </p>

            <div className="mb-6 overflow-x-auto flex justify-center">
                <table className="w-3/4 bg-white border border-gray-200">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Plan</th>
                        <th className="py-2 px-4 border-b">Max Number of Summarizations</th>
                        <th className="py-2 px-4 border-b">Max File Size</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="py-2 px-4 border-b">Registered</td>
                        <td className="py-2 px-4 border-b">5</td>
                        <td className="py-2 px-4 border-b">5MB</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b">Premium</td>
                        <td className="py-2 px-4 border-b">50</td>
                        <td className="py-2 px-4 border-b">50MB</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4">Enterprise</td>
                        <td className="py-2 px-4">200</td>
                        <td className="py-2 px-4">500MB</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="subscriptionType">
                    Select Subscription Plan:
                </label>
                <select
                    id="subscriptionType"
                    value={subscriptionType}
                    onChange={(e) => setSubscriptionType(e.target.value as 'Premium' | 'Enterprise')}
                    className="form-select block w-full px-3 py-2 border border-gray-300 rounded"
                >
                    <option value="Premium">Premium</option>
                    <option value="Enterprise">Enterprise</option>
                </select>
            </div>

            <button
                onClick={handleSubscription}
                className="btn btn-primary w-full py-2"
                disabled={loading}
            >
                {loading ? 'Processing...' : 'Proceed to Subscription'}
            </button>
        </div>
    );
};

export default SubscriptionPage;
