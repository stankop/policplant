function ImagesGallery({images}){

    const handleFirstImage = (e) => {
        
    }

    return(
        <div className="row">
        {
        images.map((url)=>{
            return (
                <div className="col-sm-2">
                <div className="card">
                <img src={url} alt='Slikica' onClick={handleFirstImage} />
                </div>
                </div>
            )
        })
        }
        
        </div>
    )
}

export default ImagesGallery