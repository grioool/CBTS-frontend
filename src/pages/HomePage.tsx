import React from 'react';

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 flex items-center justify-center px-4">
            <div className="bg-white p-10 rounded-lg shadow-lg max-w-3xl text-center">
                <h1 className="text-4xl font-bold mb-4 text-gray-800">
                    Welcome to Cloud-Based Text Summarizer!
                </h1>
                <h2 className="text-2xl font-semibold mb-6 text-gray-700">
                    Scalable cloud-based web application that processes large PDF and text files, generating AI-powered
                    summaries.
                </h2>
                <p className="text-gray-600 leading-relaxed">
                    Our system leverages the power of Google Cloud Platform (GCP) with Terraform to automate
                    infrastructure deployment. It is designed to support high traffic using serverless and managed
                    services.
                    The app is built with Python (FastAPI) for the backend and React for the frontend. The summarization
                    service leverages Gemini to extract key points, making it ideal for scientists, researchers, and
                    lawyers who need quick insights from extensive documents.
                </p>
            </div>
        </div>
    );
};

export default HomePage;
