import {Link} from "react-router-dom";



function CTA()
{
    return(
        <section className="py-14 md:py-20 bg-blue-600">
            <div className="max-w-4xl mx-auto px-6 text-center text-white">
                <h2 className="text-4xl font-bold">
                    Ready to start learning?
                </h2> 
                <p className="mt-4 text-blue-100 text-lg">
                    Share what you know , discover new skills, and
                    grow together with SkillSwap.
                </p>
                <Link to="/signup"
                className="inline-block mt-8 bg-white text-blue-600 px-7 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                    Join SkillSwap
                </Link>
            </div>
        </section>
    );
}
export default CTA;