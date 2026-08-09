import features from "../../data/features";
import FeatureCard from "./FeatureCard";


function Features()
{
    return(
       <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold ">Why SkillSwap?</h2>
           
            <p className="text-gray-600 mt-4">
                Learn, teach and grow together with the community.
            </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature)=>(<FeatureCard 
            key={feature.id}
        title={feature.title}
    description={feature.description}/>
    ))}
        </div>
         </div>
       </section>
    );
}
 export default Features;