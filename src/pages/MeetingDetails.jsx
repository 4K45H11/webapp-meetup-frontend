import { useParams } from "react-router";
import useFetch from "../useFetch";
import Header from "../components/Header";
import Footer from "../components/Footer";

// http://localhost:3000/api/v0.1/events/${eventId}

const MeetingDetails = () => {
    const param = useParams()
    const eventId = param.eventId
    const apiUrl = `https://webapp-meetup-backend.vercel.app/events/${eventId}`
    
    const { data, loading, error } = useFetch(apiUrl)

    if (loading) {
        return <h2 className='text-center py-3'>Loading...</h2>
    }
    if (error) {
        return <h2 className='text-center py-3'>Error: {error}</h2>
    }
    if (!data) return <h2 className='text-center py-3'>No events found.</h2>

    //console.log(data)
    return (
        <div>
            <Header />
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-8">
                        <h1>{data.title}</h1><br />
                        <p><span className="text-secondary">Hosted By:</span> <br /> <strong>{data.host}</strong></p>
                        <br />
                        <img className="rounded" src={`https://placehold.co/600x400?text=${data.title}`} alt="" />
                        <br /><br />
                        <h5>Details:</h5><br />
                        <p>{data.details}</p>
                        <br />
                        <h5>Additional Information</h5>
                        <p><strong>Dress Code: </strong>{data.addInfo.dressCode}<br />
                            <strong>Age Restrictions:</strong> {data.addInfo.ageLimit} years and above</p><br />

                        <h5>Event Tags:</h5>
                        {data.tag.map(d => (<a className="btn btn-info me-2" key={d}>{d}</a>))}
                    </div>
                    <div className="col-md-4">
                        <div className="card py-3" style={{ width: "18rem" }}>
                            <div className="card-body">

                                <p className="card-text py-2"><span>⏱</span> {data.startDate} At {data.startTime} to <br /> {data.endDate} At {data.endTime}</p>
                                <p className="card-text py-2">
                                    <span>📍</span>{data.location}
                                </p>
                                <p className="card-text py-2">
                                    <span>&#129689;</span> ${data.price}
                                </p>
                            </div>
                        </div>

                        <div className="mt-3">
                            <h5>Speakers: </h5>
                            <div className="row">
                                {
                                data.speakers.map(
                                    s => (
                                        <div className="py-2 col-md-4" key={s._id}>
                                            <div className="text-center">
                                                <img src={s.profilePictureUrl} alt={`s.name`} />
                                                <p><strong>{s.name}</strong><br />{s.specialization}</p>
                                            </div>

                                        </div>
                                    )
                                )
                            }
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default MeetingDetails;