import React, {useState, useEffect} from 'react'

export default function WideImage({images, start, profileimage, clickHandler}) {
  const [currentImage, setCurrentImage] = useState(start)
  const [prevImage, setPrevImage] = useState(null)
  const [nextImage, setNextImage] = useState(null)
  console.log(currentImage);
  
  // useEffect(() => {
  //   if (images.length === 1) {
  //   imagesDivs = <img src={images[0].url}></img>

  //   }else if(images.length > 1) {
  //     imagesDivs = images.map(el => <img id={el.imageid} key={el.imageid} src={el.url}></img>)
  //     // imagesDivs[0].classList.add('show')
  //     // imagesDivs[1].classList.add('next')
  //   }
    
  // },[]);



  const moveImage = (back) => {
    const imageElements = document.getElementsByClassName('carr')
    if(images.length === 2) {
      if(currentImage === 0){
        imageElements[0].classList.add('exit')
        imageElements[0].classList.remove('show')
        imageElements[1].classList.add('show')
        setCurrentImage(1);
      }else{
        imageElements[0].classList.remove('exit')
        imageElements[1].classList.remove('show')
        imageElements[0].classList.add('show')
        setCurrentImage(0);
      }
    }else {
      if(back === true){
        imageElements[currentImage-1].classList.remove('exit')
        imageElements[currentImage].classList.remove('show')
        imageElements[currentImage-1].classList.add('show')
        setCurrentImage(currentImage-1);
      }else{
        imageElements[currentImage].classList.add('exit')
        imageElements[currentImage].classList.remove('show')
        imageElements[currentImage+1].classList.add('show')
        setCurrentImage(currentImage+1);
      }
  //     if(currentImage + 1 === images.length){
  //       setCurrentImage(0)
  //       setPrevImage(images[images.length - 1])
  //       setNextImage(1)
  //     }else if(currentImage + 2 == images.length){
  //       setCurrentImage(images[images.length - 1])
  //       setPrevImage(images[images.length - 2])
  //       setNextImage(0)
  //     }else{
  //       setPrevImage(images[currentImage])
  //       setNextImage(images[currentImage+2])
  //       setCurrentImage(images[currentImage+1])

      
    }

  }
  
  return (

    <div id={images[currentImage].imageid} className='wide-image'>
      {currentImage !== 0 && <div onClick={() => moveImage(true)} className='arrow-left'></div>}
      {images.length > 0 && images.map((el, index) => {
        if(index === 0) return <img className='carr show' id={el.imageid} key={el.imageid} src={el.url} />
        return <img className='carr' id={el.imageid} key={el.imageid} src={el.url} />
      })}
      {currentImage !== images.length-1 && <div onClick={moveImage} className='arrow-right'></div>}
      <p>{images[currentImage].description}</p>
      <div className='image-buttons'>
        <div className='button description' id='description' onClick={(e) => clickHandler(e)}>{images[currentImage].description ? 'change description' : 'add description'}</div>
        <div className='button delete' id='delete' onClick={(e) => clickHandler(e)}>delete image</div>
        <div className='button green' id='upload' onClick={(e) => clickHandler(e)}>upload new</div>
        <div className='button make-profile' id='make-profile' onClick={(e) => clickHandler(e)}>make profile</div>
      </div>
    </div>
  )
}
