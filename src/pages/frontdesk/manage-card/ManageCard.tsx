import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Sidebar from "@/constant/sidebar";
import Topbar from "@/constant/topbar";
import success from "@/assets/image/Succes 2 (1).png";
const ManageCard = () => {
  const [selectedOption, setSelectedOption] = useState("convert-card");
  const [isConvertDialogOpen, setIsConvertDialogOpen] = useState(false);
  const [isMergeDialogOpen, setIsMergeDialogOpen] = useState(false);
  const [isConvertSuccess, setIsConvertSuccess] = useState(false);
  const [isMergeSuccess, setIsMergeSuccess] = useState(false);
  const [formData, setFormData] = useState({
    previousType: "",
    previousId: "",
    currentType: "",
    currentId: "",
  });

  const isFormValid = Object.values(formData).every(
    (field) => field.trim() !== ""
  );

  const handleSubmit = () => {
    if (!isFormValid) return;

    if (selectedOption === "convert-card") {
      setIsConvertDialogOpen(true);
    } else {
      setIsMergeDialogOpen(true);
    }
  };

  const handleConfirmConvert = () => {
    setIsConvertDialogOpen(false);
    setIsConvertSuccess(true);
  };

  const handleConfirmMerge = () => {
    setIsMergeDialogOpen(false);
    setIsMergeSuccess(true);
  };

  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <main className="flex-1 p-6 ml-72">
        <Topbar />
        <Card className="my-10 border-2 rounded p-5 w-[80%] mx-auto">
          <CardContent>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg">Manage Card</h3>
              <Select onValueChange={setSelectedOption} value={selectedOption}>
                <SelectTrigger className="w-44 flex items-center justify-between">
                  <SelectValue placeholder="Convert Card" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="convert-card">Convert Card</SelectItem>
                  <SelectItem value="merge-profile">Merge Profile</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <hr className="mb-4" />
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-1">Previous Patient Type</label>
                <Select
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, previousType: value }))
                  }
                >
                  <SelectTrigger className="p-2">
                    <SelectValue placeholder="Select patient type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="type1">Type 1</SelectItem>
                    <SelectItem value="type2">Type 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block mb-1">Previous ID Number</label>
                <Input
                  placeholder="Type your ID Number here"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      previousId: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="block mb-1">Current Patient Type</label>
                <Select
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, currentType: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select patient type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="type1">Type 1</SelectItem>
                    <SelectItem value="type2">Type 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block mb-1">Current ID Number</label>
                <Input
                  placeholder="Type your ID Number here"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      currentId: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="mt-6 text-center">
              <Button
                className={`px-8 py-3 rounded ${
                  isFormValid ? "bg-purple-600 text-white" : "bg-gray-600"
                }`}
                onClick={handleSubmit}
                disabled={!isFormValid}
              >
                Confirm
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Convert Card Dialog */}
      <Dialog open={isConvertDialogOpen} onOpenChange={setIsConvertDialogOpen}>
        <DialogContent className="text-center p-10 h-[26%]">
          <p className="text-lg font-semibold mb-4">
            Do you want to convert this card with the patient’s bill?
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => setIsConvertDialogOpen(false)}
              className="border-purple-600 text-purple-600 p-4"
            >
              No
            </Button>
            <Button
              className="bg-purple-600 text-white p-4"
              onClick={handleConfirmConvert}
            >
              Yes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Merge Profile Dialog */}
      <Dialog open={isMergeDialogOpen} onOpenChange={setIsMergeDialogOpen}>
        <DialogContent className="text-center p-10 h-[26%]">
          <p className="text-lg font-semibold mb-4">
            Do you want to merge this patient with the patient’s bill?
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => setIsMergeDialogOpen(false)}
              className="border-purple-600 text-purple-600 p-4"
            >
              No
            </Button>
            <Button
              className="bg-purple-600 text-white p-4"
              onClick={handleConfirmMerge}
            >
              Yes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Convert Card Success Dialog */}
      <Dialog open={isConvertSuccess} onOpenChange={setIsConvertSuccess}>
        <DialogContent className="text-center p-6">
          <img src={success} alt="Success" className="mx-auto mb-2" />
          <p className="text-lg font-semibold mb-4">
            You have successfully converted this card!
          </p>
          <Button
            className="bg-purple-600 text-white p-4"
            onClick={() => setIsConvertSuccess(false)}
          >
            Back to Dashboard
          </Button>
        </DialogContent>
      </Dialog>

      {/* Merge Profile Success Dialog */}
      <Dialog open={isMergeSuccess} onOpenChange={setIsMergeSuccess}>
        <DialogContent className="text-center p-6">
          <img src={success} alt="Success" className="mx-auto mb-2" />
          <p className="text-lg font-semibold mb-4">
            You have successfully merged this profile!
          </p>
          <Button
            className="bg-purple-600 text-white p-4"
            onClick={() => setIsMergeSuccess(false)}
          >
            Back to Dashboard
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageCard;
