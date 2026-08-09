function FeatureCard({title, description})
{
    return(
        <div className="p-6 bg-white border border-gray-200 rounded-xl shodow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-3">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}

export default FeatureCard;