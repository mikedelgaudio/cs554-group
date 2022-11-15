import { useTitle } from "../../hooks/useTitle.hook";

const Favorited = () => {
    useTitle("Favorited");
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <h1>Favorited Dummy Text</h1>
        </div>
    )
}

export { Favorited };