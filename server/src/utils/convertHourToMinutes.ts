export default function convertHourToMinutes(time : string) {
   
   const [hour, minuites] = time.split(':').map(Number);
   const timeInMinutes = (hour *60) + minuites ; 
   return timeInMinutes; 
}