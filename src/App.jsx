import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero-Section'
import CreateTrip from './components/Create_Trip'
import ViewTrip from './components/View_Trip'
import MyTrips from './components/TripComponents/MyTrips'


function App() {

  return (
    <>
    <Header/>

    <Routes>
      <Route path='/' element={<Hero/>} />
      <Route path='/create-trip' element={<CreateTrip/>} />
      <Route path='/view-trip/:tripId' element={<ViewTrip/>}/>
      <Route path='/my-trips' element={<MyTrips/>}/>
    </Routes>
    </>
  )
}

export default App
