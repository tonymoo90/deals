import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { ChevronDown, ChevronUp, Clock, MapPin } from 'lucide-react';

const DailyDeals = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [deals, setDeals] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [selectedDay, setSelectedDay] = useState(new Date().toLocaleString('en-us', { weekday: 'long' }));

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const today = new Date().toLocaleString('en-us', { weekday: 'long' });

  useEffect(() => {
    const loadData = async () => {
      const [restaurantData, scheduleData, dealsData] = await Promise.all([
        import('../../data/restaurants.json'),
        import('../../data/schedule.json'), 
        import('../../data/specials.json')
      ]);
      
      setRestaurants(restaurantData.default);
      setSchedules(scheduleData.default.filter(s => s.Days.includes(selectedDay)));
      setDeals(dealsData.default.filter(d => d.Day === selectedDay));
    };
    
    loadData();
  }, [selectedDay]);

  const isCurrentlyActive = (schedule) => {
    if (selectedDay !== today) return false;
    
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const [startHours, startMinutes] = schedule.start.split(':')[0].split(' ')[0].split(':');
    const [endHours, endMinutes] = schedule.end.split(':')[0].split(' ')[0].split(':');
    
    const startTime = parseInt(startHours) * 60 + parseInt(startMinutes || 0);
    const endTime = parseInt(endHours) * 60 + parseInt(endMinutes || 0);
    
    return currentTime >= startTime && currentTime <= endTime;
  };

  const DaySelector = () => (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
      {daysOfWeek.map(day => (
        <button
          key={day}
          onClick={() => setSelectedDay(day)}
          className={`px-4 py-2 rounded-full whitespace-nowrap
            ${day === selectedDay ? 'bg-blue-500 text-white' : 'bg-gray-200'}
            ${day === today ? 'border-2 border-blue-500' : ''}
          `}
        >
          {day}
        </button>
      ))}
    </div>
  );

  // ... rest of the component remains the same as before ...
  const getRestaurantDeals = (restaurantName, type) => {
    console.log("Deals:", deals); // Add this to debug
    return deals.filter(deal => 
      deal.Restaurants === restaurantName && 
      ((type === "Daily" && deal.Time === "All") || deal.Time === type)
    );
  };

  const getRestaurantsForSection = (type) => {
    console.log("Schedules:", schedules); // Add this to debug
    const relevantSchedules = schedules.filter(s => 
      (type === "Daily" ? s.Type === "Daily" : s.Type === type)
    );
    const filteredRestaurants = restaurants.filter(r => 
      relevantSchedules.some(s => s.Name === r.Restaurants)
    );
    
    return filteredRestaurants.sort((a, b) => {
      const scheduleA = relevantSchedules.find(s => s.Name === a.Restaurants);
      const scheduleB = relevantSchedules.find(s => s.Name === b.Restaurants);
      
      if (!scheduleA || !scheduleB) return 0;
      
      const [hoursA, minutesA] = scheduleA.end.split(':')[0].split(' ')[0].split(':');
      const [hoursB, minutesB] = scheduleB.end.split(':')[0].split(' ')[0].split(':');
      
      const timeA = parseInt(hoursA) * 60 + parseInt(minutesA || 0);
      const timeB = parseInt(hoursB) * 60 + parseInt(minutesB || 0);
      
      return timeA - timeB;
    });
  };

  const toggleExpanded = (restaurantName) => {
    setExpanded(prev => ({
      ...prev,
      [restaurantName]: !prev[restaurantName]
    }));
  };

  const Section = ({ title, type }) => {
    const sectionRestaurants = getRestaurantsForSection(type);
    
    if (sectionRestaurants.length === 0) return null;

    return (
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sectionRestaurants.map((restaurant) => {
            const restaurantSchedule = schedules.find(s => 
              s.Name === restaurant.Restaurants && s.Type === type
            );
            const isActive = restaurantSchedule && isCurrentlyActive(restaurantSchedule);
            
            return (
              <Card 
                key={restaurant.Restaurants}
                className={`hover:shadow-lg transition-shadow ${isActive ? 'border-green-500 border-2' : ''}`}
              >
                <CardHeader className="cursor-pointer" onClick={() => toggleExpanded(restaurant.Restaurants)}>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{restaurant.Restaurants}</CardTitle>
                    <div className="flex items-center gap-2">
                      {isActive && (
                        <span className="text-sm text-green-500 font-semibold">
                          Open Now
                        </span>
                      )}
                      {expanded[restaurant.Restaurants] ? <ChevronUp /> : <ChevronDown />}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{restaurant.Street}, {restaurant.City}</span>
                  </div>
                  {restaurantSchedule && (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{restaurantSchedule.start} - {restaurantSchedule.end}</span>
                    </div>
                  )}
                </CardHeader>
                
                {expanded[restaurant.Restaurants] && (
                  <CardContent>
                    {getRestaurantDeals(restaurant.Restaurants, type).map((deal, idx) => (
                      <div key={idx} className="py-2 border-t first:border-t-0">
                        <div className="flex justify-between">
                          <span>{deal.Item}</span>
                          {deal.Price && <span className="font-bold">${deal.Price}</span>}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">{selectedDay}'s Deals</h1>
      </div>
      
      <DaySelector />
      
      {schedules.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No specials available on {selectedDay}
        </div>
      ) : (
        <>
          <Section title="Daily Specials" type="Daily" />
          <Section title="Lunch Specials" type="Lunch" />
          <Section title="Happy Hour Specials" type="Happy Hour" />
          <Section title="Late Night Specials" type="Late Night" />
        </>
      )}
    </div>
  );
};

export default DailyDeals;