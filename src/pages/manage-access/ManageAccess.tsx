import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Sidebar from "@/constant/sidebar";
import Topbar from "@/constant/topbar";
import LockIcon from "@/assets/image/erasebg-transformed 2.png";
import LockIconGreen from "@/assets/image/erasebg-transformed 2 (2).png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const patients = [
  {
    name: "Adeola Abimbola",
    regDate: "15-Feb-2020",
    lastSeen: "20-Mar-2022",
    gender: "M",
    patientType: "COMPANY",
    staff: "Titilayo Olayinka",
    permittedBy: "Titilayo Olayinka",
    status: "BLOCKED",
    id: "08023456789",
  },
  {
    name: "Chinwe Eze",
    regDate: "15-Feb-2020",
    lastSeen: "20-Mar-2022",
    gender: "M",
    patientType: "PRIVATE",
    staff: "Bayo Hammed",
    permittedBy: "Bayo Hammed",
    status: "BLOCKED",
    id: "07034567890",
  },
  {
    name: "Dayo Ogunbiyi",
    regDate: "15-Feb-2020",
    lastSeen: "20-Mar-2022",
    gender: "F",
    patientType: "COMPANY",
    staff: "Titilayo Olayinka",
    permittedBy: "Titilayo Olayinka",
    status: "ACTIVE",
    id: "09045678901",
  },
  {
    name: "Emeka Okafor",
    regDate: "15-Feb-2020",
    lastSeen: "20-Mar-2022",
    gender: "M",
    patientType: "HMO",
    staff: "Titilayo Olayinka",
    permittedBy: "Titilayo Olayinka",
    status: "ACTIVE",
    id: "08056789012",
  },
  {
    name: "Ifenayi Okoro",
    regDate: "15-Feb-2020",
    lastSeen: "20-Mar-2022",
    gender: "M",
    patientType: "COMPANY",
    staff: "Titilayo Olayinka",
    permittedBy: "Titilayo Olayinka",
    status: "BLOCKED",
    id: "05067890123",
  },
  {
    name: "Kehinde Afolabi",
    regDate: "15-Feb-2020",
    lastSeen: "20-Mar-2022",
    gender: "M",
    patientType: "PRIVATE",
    staff: "Titilayo Olayinka",
    permittedBy: "Titilayo Olayinka",
    status: "ACTIVE",
    id: "04708901234",
  },
  {
    name: "Toluwani Adebayo",
    regDate: "15-Feb-2020",
    lastSeen: "20-Mar-2022",
    gender: "F",
    patientType: "COMPANY",
    staff: "Titilayo Olayinka",
    permittedBy: "Titilayo Olayinka",
    status: "ACTIVE",
    id: "09012345678",
  },
  {
    name: "Samuel Akinlade",
    regDate: "15-Feb-2020",
    lastSeen: "20-Mar-2022",
    gender: "M",
    patientType: "PRIVATE",
    staff: "Bayo Hammed",
    permittedBy: "Bayo Hammed",
    status: "BLOCKED",
    id: "08023412345",
  },
  {
    name: "Mariam Oladipo",
    regDate: "15-Feb-2020",
    lastSeen: "20-Mar-2022",
    gender: "F",
    patientType: "HMO",
    staff: "Titilayo Olayinka",
    permittedBy: "Titilayo Olayinka",
    status: "ACTIVE",
    id: "07098765432",
  },
  {
    name: "Bola Adebisi",
    regDate: "15-Feb-2020",
    lastSeen: "20-Mar-2022",
    gender: "M",
    patientType: "COMPANY",
    staff: "Titilayo Olayinka",
    permittedBy: "Titilayo Olayinka",
    status: "BLOCKED",
    id: "09087654321",
  },
  {
    name: "Femi Adeyemi",
    regDate: "15-Feb-2020",
    lastSeen: "20-Mar-2022",
    gender: "M",
    patientType: "PRIVATE",
    staff: "Bayo Hammed",
    permittedBy: "Bayo Hammed",
    status: "ACTIVE",
    id: "08076543210",
  },
];

const ManageAccess = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // Modal state
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [unblockModalOpen, setUnblockModalOpen] = useState(false);
  const [reasonForUnblock, setReasonForUnblock] = useState("");
  const [reason, setReason] = useState("");
  const [permittedBy, setPermittedBy] = useState("");

  const filteredPatients = patients.filter((patient) =>
    Object.values(patient).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const toggleSelectAll = (): void => {
    if (selectAll) {
      setSelected([]);
    } else {
      setSelected(filteredPatients.map((patient) => patient.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleSelect = (id: string): void => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleConfirmBlock = () => {
    setModalOpen(false); // Close the first modal
    setTimeout(() => setSuccessModalOpen(true), 300); // Open success modal
  };

  const handleUnblockConfirm = () => {
    setUnblockModalOpen(false);
    setSuccessModalOpen(true);
  };

  return (
    <div className="flex h-screen w-full ">
      <Sidebar />
      <main className="flex-1 p-6 ml-72">
        <Topbar />
        <div className="flex justify-between items-center mb-4 mt-10">
          <Input
            type="text"
            placeholder="Search with Surname, Patient ID or Phone number"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-1/3"
          />
          <div className="flex gap-2">
            <Button
              variant="destructive"
              onClick={() => selected.length > 0 && setModalOpen(true)}
              disabled={selected.length === 0}
            >
              Block
            </Button>
            <Button
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={() => selected.length > 0 && setUnblockModalOpen(true)}
              disabled={selected.length === 0}
            >
              Unblock
            </Button>
          </div>
        </div>
        {/* Modal for Blocking */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-lg h-96">
            <DialogHeader>
              <DialogTitle>Block Patient</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 gap-4">
              <label className="text-sm  mt-3">Reason for Blocking</label>
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fraud">Fraud</SelectItem>
                  <SelectItem value="violation">Policy Violation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              <label className="text-sm  mt-3">Reason for Unblocking</label>
              <Select onValueChange={setReason} disabled>
                <SelectTrigger>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fraud">Fraud</SelectItem>
                  <SelectItem value="violation">Policy Violation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              <label className="text-sm ">Permitted By</label>
              <Select onValueChange={setPermittedBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Senior Management" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager1">Manager 1</SelectItem>
                  <SelectItem value="manager2">Manager 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              onClick={handleConfirmBlock}
            >
              Confirm
            </Button>
          </DialogContent>
        </Dialog>
        <Dialog open={successModalOpen} onOpenChange={setSuccessModalOpen}>
          <DialogContent className="max-w-sm text-center">
            <img
              src={LockIcon}
              alt="Lock Icon"
              width={80}
              height={80}
              className="mx-auto"
            />
            <p className="text-lg font-semibold mt-4">
              You have successfully blocked this Patient!
            </p>
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-4"
              onClick={() => setSuccessModalOpen(false)}
            >
              Back to Dashboard
            </Button>
          </DialogContent>
        </Dialog>

        {/* Unblock Modal */}
        <Dialog open={unblockModalOpen} onOpenChange={setUnblockModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Unblock Patient</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <label className="text-sm font-medium">
                Reason for Unblocking
              </label>
              <Select
                value={reasonForUnblock}
                onValueChange={setReasonForUnblock}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mistake">Blocked by Mistake</SelectItem>
                  <SelectItem value="reviewed">Policy Reviewed</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              <label className="text-sm font-medium">Permitted By</label>
              <Select value={permittedBy} onValueChange={setPermittedBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Senior Management" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager1">Manager 1</SelectItem>
                  <SelectItem value="manager2">Manager 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-4"
              onClick={handleUnblockConfirm}
            >
              Confirm
            </Button>
          </DialogContent>
        </Dialog>

        {/* Success Modal */}
        <Dialog open={successModalOpen} onOpenChange={setSuccessModalOpen}>
          <DialogContent className="max-w-md text-center">
            <img
              src={LockIconGreen}
              alt="Unblock Success"
              width={80}
              height={80}
              className="mx-auto"
            />
            <p className="mt-4 text-lg font-semibold">
              You have successfully Unblocked this Patient!
            </p>
            <Button
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white w-full"
              onClick={() => setSuccessModalOpen(false)}
            >
              Back to Dashboard
            </Button>
          </DialogContent>
        </Dialog>
        <div className="overflow-auto max-w-full">
          <Table className="min-w-full border-collapse">
            <TableHeader>
              <TableRow className="h-12">
                <TableHead>
                  <Checkbox
                    checked={selectAll}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead className="uppercase">Patient Name</TableHead>
                <TableHead className="uppercase">Reg Date</TableHead>
                <TableHead className="uppercase">Last Seen</TableHead>
                <TableHead className="uppercase">Gender</TableHead>
                <TableHead className="uppercase">Patient Type</TableHead>
                <TableHead className="uppercase">Staff Name</TableHead>
                <TableHead className="uppercase">Permitted By</TableHead>
                <TableHead className="uppercase">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow
                  key={patient.id}
                  className="h-16 border-b border-gray-200"
                >
                  <TableCell>
                    <Checkbox
                      checked={selected.includes(patient.id)}
                      onCheckedChange={() => toggleSelect(patient.id)}
                    />
                  </TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.regDate}</TableCell>
                  <TableCell>{patient.lastSeen}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{patient.patientType}</Badge>
                  </TableCell>
                  <TableCell>{patient.staff}</TableCell>
                  <TableCell>{patient.permittedBy}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        patient.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    >
                      {patient.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};
export default ManageAccess;
