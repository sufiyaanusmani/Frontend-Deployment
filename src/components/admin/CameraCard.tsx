'use client'
import { Camera } from '@/types/camera';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Separator } from '../ui/separator';
import { Pencil, Trash } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface CameraCardProps {
    camera: Camera;
    onDelete: (id: string) => void;
    onUpdate: (id: string, updatedCamera: Partial<Camera>) => void;
  }



  const CameraCard: React.FC<CameraCardProps> = ({ camera, onDelete, onUpdate }) => {
    const [editFormData, setEditFormData] = useState({
      name: camera.name,
      location: camera.location,
      model: camera.model,
      ipAddress: camera.ipAddress,
    });
    const [isSheetOpen, setIsSheetOpen] = useState(false);
  
    const stateColors = {
      connected: 'bg-green-500',
      running: 'bg-blue-500',
      disconnected: 'bg-red-500'
    };
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setEditFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleSaveChanges = () => {
      onUpdate(camera.id, editFormData);
      setIsSheetOpen(false);
    };
  
    return (
      <div className="border-2 border-dashed rounded-lg overflow-hidden relative group">
        <div className="p-0">
          <div className="flex justify-between items-center h-full w-full bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-semibold">{camera.name}</h3>
            <TooltipProvider delayDuration={100} skipDelayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className={`inline-block w-3 h-3 rounded-full ${stateColors[camera.state]}`}></span>
                </TooltipTrigger>
                <TooltipContent>
                  <span className="text-sm capitalize">{camera.state}</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
  
          <p className="text-sm text-gray-600 px-4 py-1">{camera.location}</p>
          <p className="text-sm text-gray-600 px-4 py-1 mb-4">{camera.model}</p>
        </div>
  
        {/* Edit and Delete Buttons */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <button className="text-gray-500 hover:text-gray-800 mr-2">
                <Pencil size={16} />
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit Camera</SheetTitle>
                <SheetDescription>
                  Make changes to your camera settings here.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Camera Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={editFormData.name}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={editFormData.location}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="model" className="text-right">Model</Label>
                  <Input
                    id="model"
                    name="model"
                    value={editFormData.model}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="ipAddress" className="text-right">IP Address</Label>
                  <Input
                    id="ipAddress"
                    name="ipAddress"
                    value={editFormData.ipAddress}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <SheetFooter>
                <Button onClick={handleSaveChanges}>Save changes</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
  
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="text-gray-500 hover:text-gray-800">
                <Trash size={16} />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete this camera: {camera.name}?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. The camera data will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(camera.id)}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    );
  };
  
  export default CameraCard;