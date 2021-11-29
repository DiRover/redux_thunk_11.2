function Spinner() {
    return (
        <div className="d-flex justify-content-center" style={{"margin": "30px auto 0 auto"}}>
            <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
};

export default Spinner;