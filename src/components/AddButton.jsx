function AddButton({ showCreatePanel }) {
    const onAddClick = () => {
        showCreatePanel(true)
    }

    return (
        <button className="addButton" onClick={onAddClick}>
            +新增
        </button>
    )
}

export default AddButton