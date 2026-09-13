function Card({ item, onDelete, onEdit }) {
    return (
        <div className="card">
            <img src={item.imageUrl} alt={item.title} />
            <p>{item.title}</p>
            <button onClick={() => onDelete(item.id)}>Excluir</button>
            <button onClick={() => onEdit(item)}>Editar</button>
        </div>
    )
}

export default Card