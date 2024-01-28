import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaTrashAlt, FaEye, FaPencilAlt } from "react-icons/fa";
import { ProjetoProps } from "@/types";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { DropdownMenuGroup, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";

interface TableProps {
  Projetos: ProjetoProps[];
  handleDelete: (id: string) => void;
  isViewModal: (id: string) => void;
  isEditModal: (id: string) => void;
}

export function TableProjetos({ Projetos, handleDelete, isViewModal, isEditModal }: TableProps) {
  const router = useRouter();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>N°</TableHead>
          <TableHead>Titulo</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Tecnologias</TableHead>
          <TableHead className="text-right">Ação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Projetos.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="font-medium text-lg">{item.title}</TableCell>
            <TableCell>
              <p className={`${item.published ? "text-green-500" : "text-red-500"} font-bold text-base`}>{item.published ? "Publicado" : "Não Publicado"}</p>
            </TableCell>
            <TableCell className="w-[50px] flex gap-2">
              {item.types.slice(0, 5).map((type: string, index: number) => (
                <p className="bg-blue-200 p-1 rounded text-white" key={index}>
                  {type}
                </p>
              ))}
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-[#d4d4d4] hover:bg-[#b4b4b4] dark:bg-[#1b1b1b] text-black dark:text-white dark:hover:bg-gray-400">...</Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="dark:bg-gray-400 dark:text-white dark:border-gray-300">
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="dark:hover:bg-[#1b1b1b] dark:text-white cursor-pointer" onClick={() => handleDelete(item.id)}>
                      Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem className="dark:hover:bg-[#1b1b1b] dark:text-white cursor-pointer" onClick={() => isViewModal(item.id)}>
                      Olhar projeto
                    </DropdownMenuItem>
                    <DropdownMenuItem className="dark:hover:bg-[#1b1b1b] dark:text-white cursor-pointer" onClick={() => isEditModal(item.id)}>
                      Editar
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
