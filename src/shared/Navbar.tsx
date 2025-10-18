import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

const Navbar = () => {
    return (
        <div className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Product Manager</h1>
                        <p className="text-sm text-muted-foreground mt-1">rh.rakibhasan365@gmail.com</p>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            // onClick={handleLogout}
                            className="gap-2"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar