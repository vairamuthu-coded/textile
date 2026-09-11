import React from 'react'

const Four = () => {
  return (
    <>
   <div className='body4' >
    <header>
   
    <nav>
    <a href='#profile1'>VAIRAMUTHU </a>
    <a href='#profile2'>MAHESEARI </a>
    <a href='#profile3'>ABISHIEK </a>

    </nav>
    </header>
   <main>
     <article id="profile1" className='card'>
    <figure>
      <img src='./Images/IMAGE1.jpg' alt='Babys' >

      </img>
      <figcaption>
        vairamuthu
        <span className='nowrap'>
        NetFlex Channel
        </span>
      </figcaption>
    </figure>
    <p>
      vairamuthu 
    </p>
     </article>
     <article id="profile2" className='card'>
    <figure>
      <img src='./Images/IMAGE2.jpg' alt='Babys' >
      </img>
      <figcaption>
      MAHESWARI
        <span className='nowrap'>
        YouTube Channel
        </span>
      </figcaption>
    </figure>
    <p>
      MAHESWARI 
    </p>
     </article>

     <article id="profile3" className='card'>
    <figure>
      <img src='./Images/IMAGE3.jpg' alt='Babys' >
      </img>
      <figcaption>
      ABISHIEK
        <span className='nowrap'>
        Google Channel
        </span>
      </figcaption>
    </figure>
    <p>
      ABISHIEK 
    </p>
     </article>


     </main>
    </div>
    </>
  )
}

export default Four
