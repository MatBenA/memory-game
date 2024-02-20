import "./card.css"

export default function Card({ character, onClick, id }) {
    return (
        <div onClick={onClick} id={id} className="card">
            <img
                src={
                    "https://jojos-bizarre-api.netlify.app/assets/" +
                    character.image
                }
                alt=""
            />
            <p>{character.name}</p>
        </div>
    );
}
