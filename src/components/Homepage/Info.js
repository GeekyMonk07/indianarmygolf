import img1 from "../../assets/Picture8.png";
import img2 from "../../assets/Picture9.png";

const Info = () => {
    const sections = [
        {
            text: "Assam is one of the most gifted parts of the country as far as natural resources are concerned. It is known for its varied culture, wildlife and flora/fauna. Guwahati being the gateway of North East region possesses lot of potential to showcase its rich healthy ecosystem. Rhino Environment Park crafted in the year 1978, located in Narangi Military Station and is spread over an area of approximately 120 acres. The environmental park is one of the most beautiful locations of Guwahati with splendid greens and open grass fairways. The area lies between Amsing and Amchang wildlife sanctuary which is the habitat of rare animals such as Asian Elephants, Pythons, Tigers, Gaurs, Deers and numerous endangered Birds.",
            image: img1,
            reverse: false,
        },
        {
            text: "The area is full of vegetation, grassy land and water bodies. The areas physiography, edaphic conditions and conducive climate have made it into an environmental hub in the general area. The project is an attempt to develop the environmental park & training area, which is best suited for the animal habitat and better forestry cover. The same will assist in ensuring sustained development in arboriculture and improvement of the general area in an around the environmental park.",
            image: img2,
            reverse: true,
        },
    ];

    return (
        <div className="mt-20 px-4">
            {sections.map((section, index) => (
                <div
                    key={index}
                    className={`flex flex-col lg:flex-row ${section.reverse ? 'lg:flex-row-reverse' : ''} items-center my-12`}
                >
                    <div className="lg:w-1/2 p-4">
                        <p className="text-lg lg:text-xl text-gray-800 leading-relaxed text-justify">
                            {section.text}
                        </p>
                    </div>
                    <div className="lg:w-1/2 p-4">
                        <img
                            src={section.image}
                            alt={`Section ${index + 1}`}
                            className="rounded-lg shadow-lg w-full h-full object-cover"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Info;
