import { Button } from "@/components/ui/button"
import { Users, Mic2, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const WaitingApproval: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <header className="max-w-7xl mx-auto flex justify-between items-center py-4">
        <div className="flex items-center gap-2">
          <img 
            src="/icons/logo.svg?height=40&width=40" 
            alt="GOYoungAfrica Logo" 
            width={40} 
            height={40}
          />
          <span className="text-2xl font-bold">
            <span className="text-orange-500">GO</span>
            <span className="text-black">Young</span>
            <span className="text-blue-500">Africa</span>
          </span>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white"
         onClick={() => navigate('/donate')}
          >
          Donate
        </Button>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto mt-8 text-center relative">
        {/* Floating Elements */}
        <div className="absolute left-[15%] top-[10%] bg-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
          <Users className="text-blue-500" />
          <span className="text-gray-800">Collaborate</span>
        </div>

        <div className="absolute left-[20%] top-[40%] bg-white rounded-full px-3 py-3 shadow-lg">
          <img 
            src="https://i.pravatar.cc/150?img=2" 
            alt="Collaborator" 
            width={32} 
            height={32} 
            className="rounded-full"
          />
          <span className="text-sm text-orange-500 whitespace-nowrap">Collaborate</span>
        </div>

        <div className="absolute right-[15%] top-[10%] bg-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
          <img 
            src="https://i.pravatar.cc/150?img=1" 
            alt="John Smith" 
            width={32} 
            height={32} 
            className="rounded-full"
          />
          <span className="text-gray-800">John Smith</span>
        </div>

        <div className="absolute right-[20%] top-[40%] bg-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
          <Mic2 className="text-purple-500" />
          <span className="text-purple-500">Talents</span>
        </div>

        {/* Central Illustration */}
        <div className="max-w-2xl mx-auto mb-12">
          <img 
            src="/images/waiting.png?height=400&width=600" 
            alt="Collaboration Illustration" 
            width={600} 
            height={400}
            className="w-full h-auto"
          />
        </div>

        {/* Text Content */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">
            <span className="text-orange-500">Please be patient</span>
            <span className="text-gray-900"> while you wait for</span>
          </h1>
          <p className="text-3xl font-semibold text-gray-900">
            the approval to join our Mentors
          </p>
          <p className="text-3xl font-semibold text-gray-900">
            community at <span className="text-blue-500">GOYA</span>
          </p>
          
          <p className="text-blue-500 text-lg">
            You will receive an email of our response to your application
          </p>

          <div className="mt-8">
            <Button 
              className="bg-blue-500 hover:bg-blue-600 text-white px-8"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Go back to site
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}


export default WaitingApproval