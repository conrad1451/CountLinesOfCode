import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';

// import { getTestData } from './app/api/exportCode';
import { getTestData } from '../api/exportCode';

// CHQ: the way this is being made, this is a module. Nice
const store = (set: any) => ({

  // in this module, we are setting state, and then passing that on to the file that calls this
  
  // anyData = "filler",
  myObj = {},
  name = "",
  age = 0,
  date = "",
  programming = "", 

  fetchTheData: async (currentCount, chunk) => {
    try {
      const data = await getTestData()
				if (data) {
					setdata({
					name: data.Name,
					age: data.Age,
					date: data.Date,
					programming: data.programming,
				});
			}
			console.log("success", data);
			// alert("success", data);
			} catch (error) {
				console.error(error);
			} 
  }
  
})

const log = (config: any) => (set: any, get: any, api: any) => config(
  (...args: any) => {
      console.log(args);
      set(...args);
  },
  get,
  api
)

export const useStore = create(
    subscribeWithSelector(log(persist(devtools(store), { name: 'store' })))
);

// store.SOMETHING, where the SOMETHING is the internal data structure
// that gets modified with all these methods
useStore.subscribe(
    (store => store.myObj),
    () => {
        useStore.setState({})
    }
)

const extractAnimeInfo = (data: any) =>{
}
