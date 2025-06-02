import { useEffect, useState } from 'react'
import useFetch from '../useFetch'
import { Link,useSearchParams } from 'react-router-dom'


const Meetings = () => {

    //hadlding the drop down
    const[searchParams,setSearchParams] = useSearchParams()
    
    const initalType = searchParams.get('type') || 'all'
    const [eventType,setEventType] = useState(initalType)
    
    
    useEffect(()=>{
        setSearchParams({type:eventType})
    },[eventType])
    const { data, loading, error } = useFetch(`https://webapp-meetup-backend.vercel.app/events`)



    //hadling side visuals.
    if(loading){
        return <h2 className='text-center py-3'>Loading...</h2>
    }
    if(error){
        return <h2 className='text-center py-3'>Error: {error}</h2>
    }
    if (!data || !data.length) return <h2 className='text-center py-3'>No events found.</h2>

    
    //hadling filters

    const handleChange = (event)=>{
        const {value} = event.target;
        setEventType(value)
    }

    const isOnline = eventType==='online'

   
    //console.log(isOnline)

    const finalData = (eventType==="all")?data:data.filter(d=>d.isOnline===isOnline)

    //console.log(eventType)


    const eventListings = finalData.map(d => (
        <div key={d._id} className='col-md-4 mt-3'>
            <div className="card mt-5" style={{ width: '18rem' }}>
                <img src={`https://placehold.co/600x400?text=${d.title}`} className="card-img-top" alt="img" />
                <div className='card-body'>
                    <h5 className="card-title">{d.title}</h5>
                    <p className="card-text">{d.startDate} <span>&middot;</span> {d.startTime}</p>
                    <Link className='btn btn-info' to={`/details/${d._id}?type=${eventType}`}>Event Details</Link>
                </div>
            </div>
        </div>
    ))

    

    return (
        <div className='py-3 container'>
            <div className='row py-2'>
                <div className='col-md-10'>
                    <h1 className='' >Meetup Events</h1>
                </div>
                <div className='col-md-2 '>
                    <div className='container'>
                        <select 
                        className='form-select' onChange={handleChange}
                        value={eventType}>
                            <option value=""  disabled >select event type</option>
                            <option value="all">All</option>
                            <option value="online">online</option>
                            <option value="offline">offline</option>
                        </select>
                    </div>

                </div>
            </div>
            <div className='row py-2'>
                {eventListings}
            </div>


        </div>
    )
}

export default Meetings;