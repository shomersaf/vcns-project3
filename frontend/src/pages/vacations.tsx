
import { useEffect, useState } from "react";
import { useAddFollowingMutation, useDeleteFollowingMutation, useGetFollowingsByUserMutation, useGetVacationsQuery } from "../store/api/vacations.api"
import { Footer } from "../ui/footer";
import { Header } from "../ui/header";
import { useAuth } from "../store/hooks/use-auth";
import { IVacation } from "../models/models";



export function Vacations() {
  const [position, setPosition] = useState("0")
  const [all, setAll] = useState(true)
  const [favourites, setFavourites] = useState(false)
  const [current, setCurrent] = useState(false)
  const [upcoming, setUpcoming] = useState(false)
  const [page, setPage] = useState(1)
  const [clicked, setClicked] = useState(false)
  const [vacationsList, setVacationsList] = useState<number[]>()
  const step: number = 10;
  
  let filterMode = "";
  if (all) filterMode = "all"
  if (favourites) filterMode = "favourites"
  if (current) filterMode = "current"
  if (upcoming) filterMode = "upcoming"
  const { email } = useAuth()
 if(Number(position) <0){setPosition("0");}
  const { isLoading, isError, data } = useGetVacationsQuery({stepFrom: position, filterName: filterMode, filterBy: email})
  const [likeBuffer, setLikeBuffer] = useState({})
  const [dataBuffer, setDataBuffer] = useState({})

  if (data && data.length && data != dataBuffer){
    // console.log("DATA UPDATED!@#$%^")
    setDataBuffer(data)
    setLikeBuffer({})
  }

  if (data && Object.keys(likeBuffer).length === 0) {
    const _likeBuffer = JSON.parse(JSON.stringify(likeBuffer))
    data?.map((v: IVacation) => {
      _likeBuffer[v.vcnId] = 0;
    })
    setLikeBuffer(_likeBuffer)
  }

  
  const [getFollowingsByUser] = useGetFollowingsByUserMutation()
  const [addFollowing] = useAddFollowingMutation()
  const [deleteFollowing] = useDeleteFollowingMutation()
  const dataLength: number | undefined = data?.length
  if (dataLength == 0 && page > 0) {
    setPosition(((+position) - step).toString())
    setPage(page - 1);
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    // These options are needed to round to whole numbers if that's what you want.
    // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  const getFollowingsByUserHandler = async (email: string) => {
    const result = await getFollowingsByUser(email)
    const resList = Object(result).data
    const vax = resList.map((v: { fVacationId: number; }) => v.fVacationId)
    setVacationsList(vax)
  }

  const addFollowingHandler = async (email: string, vcnId: number) => {
    setClicked(false)
    await addFollowing({ email, vcnId })
    likeBuffer[vcnId] += 1;
    setClicked(true)

  }

  const deleteFollowingHandler = async (email: string, vcnId: number) => {
    setClicked(false)
    await deleteFollowing({ email, vcnId })
    likeBuffer[vcnId] += -1;
    setClicked(true)
  }


  useEffect(() => {
    getFollowingsByUserHandler(email)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clicked])

  // console.log("vacationsList: ", vacationsList)

  function allHandler(){
    setAll(true); 
    setFavourites(false);
    setCurrent(false)
    setUpcoming(false)
  }

  function favouritesHandler(){
    setFavourites(true); 
    setAll(false)
    setCurrent(false)
    setUpcoming(false)
}
    function currentHandler(){
      setCurrent(true)
      setAll(false); 
      setFavourites(false);
      setUpcoming(false)
     }
    

     function upcomingHandler(){
      setUpcoming(true)
      setCurrent(false)
      setAll(false); 
      setFavourites(false);
     }
    

  return (
    <>
      <Header />
  <form className="filterForm" action="#">
  <div><input type="checkbox" name="all" value="all" onChange={allHandler} checked={all}/> All</div>
  <div><input type="checkbox" name="favourites" value="favourites"  onChange={favouritesHandler} checked={favourites} /> Favourites</div>
  <div><input type="checkbox" name="current" value="current" onChange={currentHandler} checked={current} /> Current</div>
  <div><input type="checkbox" name="upcoming" value="upcoming" onChange={upcomingHandler} checked={upcoming} /> Upcoming</div>
  </form>
  
      <div className="wrapper">

        
        {isError && <p className="errorP">Something went wrong...</p>}
        {isLoading && <p className="loadingP">Loading...</p> || 
          <div className="wrapper">
            <div className="pagination">
              <button onClick={() => { prevPage(position, page, dataLength, step) }}>prev</button>
              <div className="pageNum">{page !== 0 ? page : "1"}</div>
              <button onClick={() => { nextPage(position, page, dataLength, step) }}>next</button>
            </div>
            {!data?.length && <h2>Nothing Found</h2>}
            <div className="cards">
              { data?.map(vacation => (
                <div key={vacation.destination + vacation.fromDate} className="card">
                 { <img src={vacation.imageSrc} alt={"NO IMG SRC"} /> }
                  <div className="description">
                    <div className="top">
                      <h3>{vacation.destination}</h3>
                      <p className="about">{vacation.about}</p>
                    </div>
                    <div className="downtown">
                      <div className="date">
                        <span>{new Date(vacation.fromDate).toLocaleDateString()}  - </span>
                        <span>{new Date(vacation.toDate).toLocaleDateString()}</span>
                      </div>
                      <div className="cardFooter">
                        <div className="price">{formatter.format(vacation.price)}</div>
                        <div className="likeDiv">
                          {vacationsList && vacationsList.find((v) => v == Number(vacation.vcnId)) ?
                            <div>
                              <div>
                                <span className="like" title="unfollow" >&#10084;</span>
                                <span className="likes">{vacation.followers + likeBuffer[Number(vacation.vcnId)]}</span>
                              </div>
                              <button onClick={() => { deleteFollowingHandler(email, +vacation.vcnId); }}>unfollow</button>
                            </div>
                            :
                            <div>
                              <div>
                                <span className="dislike" title="follow" >&#10084;</span>
                                <span className="likes">{vacation.followers + likeBuffer[Number(vacation.vcnId)]}</span>
                              </div>
                              <button onClick={() => { addFollowingHandler(email, +vacation.vcnId); }}>follow</button>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )) }
            </div>
          </div>}
      </div>
      <Footer />
    </>
  )

  function nextPage(position: string, page: number, dataLength: number | undefined, step: number) {
    if (position == "all" || dataLength && dataLength >= step) {
      if (page == 0) {
        setPosition("0");
        setPage(page + 1);
      } else {
        setPosition(((+position) + step).toString())
        setPage(page + 1);
      }
    }
  }

  function prevPage(position: string, page: number, dataLength: number | undefined, step: number) {
    if (dataLength && position == "all" || dataLength && Number(position) > 0) {
      if (page == 0) {
        setPosition("all");
      } else {
        setPosition(((+position) - step).toString())
        setPage(page - 1);
      }
    }
  }

}