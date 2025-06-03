import Header from "../components/Header";
import { Link,useSearchParams ,useNavigate} from 'react-router-dom';
import useFetch from '../useFetch'

const SearchedResult = ()=>{

    const [searchParams] = useSearchParams()
    const searchValue = searchParams.get('search')

    //code for navigating back to previous URL
    const navigate = useNavigate()

    const goBack=()=>{
        navigate(-1);
    }

    const tags = ['marketing','digital','sports','tech','geopolitics','culture','literature']
    const capitalize = (str)=>{
        const strArr = str.split(' ')
        const modifiedArr = strArr.map(s=>s.slice(0,1).toUpperCase()+s.slice(1).toLowerCase())

        return modifiedArr.join(' ')
    }
    
    //local host API routes
    
    //http://localhost:3000/events/title/${apiEndPoint}
    //http://localhost:3000/events/tag/${searchValue.toLowerCase()}

    let apiUrl = ``
    //logic to get API
    if(tags.indexOf(searchValue.toLowerCase())===-1){
       // console.log(capitalize(searchValue))
       const apiEndPoint = encodeURIComponent(capitalize(searchValue))
        apiUrl = `https://webapp-meetup-backend.vercel.app/events/title/${apiEndPoint}`
    }
    else {
        apiUrl = `https://webapp-meetup-backend.vercel.app/events/tag/${searchValue.toLowerCase()}`
        
    }

    //fetching the data

    const{data,loading,error} = useFetch(apiUrl)

    //handling the visuals
    if(loading){
        return <h2 className='text-center py-3'>Loading...</h2>
    }
    if(error){
        return <h2 className='text-center py-3'>Error: {error}</h2>
    }
    if (!data) return <h2 className='text-center py-3'>No events found.</h2>

    console.log(data)

    if(data.error) {
        return (
            <>
             <h2 className='text-center py-3'>Sorry, no results found. </h2>
             <p className="text-center"><button className="btn btn-info" onClick={goBack}>Go Back</button></p>
            </>
       )
    }

    let finalData = []

    if(Array.isArray(data)){
        finalData = [...data]
    }
    else finalData.push(data)

    

    const eventListings = finalData.map(d => (
        <div key={d._id} className='col-md-4 mt-3'>
            <div className="card mt-5" style={{ width: '18rem' }}>
                <img src={`https://placehold.co/600x400?text=${d.title}`} className="card-img-top" alt="img" />
                <div className='card-body'>
                    <h5 className="card-title">{d.title}</h5>
                    <p className="card-text">{d.startDate} <span>&middot;</span> {d.startTime}</p>
                    <Link className='btn btn-info' to={`/details/${d._id}`}>Event Details</Link>
                </div>
            </div>
        </div>
    ))

    //console.log(finalArr)

    return(
        <>
        <Header/>
        <div className='py-3 container'>
            <h3>Search result of {searchValue}: </h3>
            <div className='row py-2'>
                {eventListings}
            </div>


        </div>
        </>
    )
}

export default SearchedResult;