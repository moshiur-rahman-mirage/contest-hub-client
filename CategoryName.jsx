
const CategoryName = ({heading, subHeading}) => {
    return (
        <div>
            <div className="mx-auto text-center text-neutral-content md:w-4/12 my-8">
                {/* <p className="text-neutral-content mb-2">--- {subHeading} ---</p> */}
                <h3 className="text-3xl border-neutral-content text-neutral-content uppercase border-y-4 py-4">{heading}</h3>
            </div>
        </div>
    );
};

export default CategoryName;