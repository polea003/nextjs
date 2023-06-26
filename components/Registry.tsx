import { Button } from "@mui/material"

export default function Registry() {

    const buttonStyles = {
        color: '#315C5E',
        backgroundColor: '#ffffff',
        width: '230px'
    }

    return (
        <div className="flex flex-col items-center space-y-12 px-4">
            <div className="flex-1 flex flex-col space-y-12 text-center">
                <div className="text-5xl">Wedding Registry</div>
                <div className="flex flex-col items-center space-y-5 text-2xl">
                  <div>Registry will become available soon.</div>
                </div>
            </div>
        </div>
    )
}