import {Menu ,Bell} from "lucide-react"

const dummyData = [
    {
        emoji : "🔥",
        num : 7,
        msg : "day Streak"
    }, 
    {
        emoji : "🎯",
        num :"3h 00m",
        msg: "Daily Goal"
    },
    {
        emoji : "🌠",
        num : "80%",
        msg : "Goal Progress",
    },
    {
        emoji : "📝",
        num :850,
        msg:"focus score"
    }
]

function Topbar(){
    return(
        <div className="h-[150px] bg-gray-800 flex relative justify-between">
            {/* left side  */}
            <div>
                <div className="mt-2 ml-2 cursor-pointer text-white ">
                <Menu size={30}/>
            </div>

            <div className=" mt-4 ml-6">
                <h1 className="text-3xl font-mono">Good Morning, Robayet</h1>
                <p className="font-mono text-[#D7DCDF] mt-2 [word-spacing:-2px]">Stay focused and keep pushing forward. You've got this!🔥</p>
            </div>
            </div>
            {/* right side */}
            <div className="flex flex-col items-end mt-2 mr-4 ">
                <div className="flex gap-2">
                    <Bell/>
                  <h1>profile</h1>
                </div>
                <div className="flex gap-4">
                    {dummyData.map((data) => {
                        return(
                            <div key={data.msg} className="flex items-center mt-5 gap-2 font-mono p-2 text-[#CED1D5] bg-[#0B1723] rounded-2xl">
                        <span>{data.emoji}</span>
                        <div className="flex  flex-col justify-center items-center">
                            <h1>{data.num}</h1>
                            <p className="text-[12px]">{data.msg}</p>
                        </div>
                      </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}


export default Topbar;