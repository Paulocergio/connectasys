"use client";

import React, { useState, useEffect } from 'react';
import SidebarWrapper from "@/components/ui/sidebar";
import UsersTable from './UsersTable';
import UsersPagination from './UsersPagination';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';

const initialUsers = [
  { id: 11, nome: 'Ricardo Almeida', email: 'ricardo.almeida@empresa.com', cargo: 'Arquiteto de Software' },
  { id: 12, nome: 'Sofia Ribeiro', email: 'sofia.ribeiro@empresa.com', cargo: 'Desenvolvedora Mobile' },
  // ... outros usuários
];

export default function Page() {
  // Estado para armazenar a lista de usuários
  const [usuarios, setUsuarios] = useState(initialUsers);
  
  // Estado para paginação
  const [paginaAtual, setPaginaAtual] = useState(1);
  const registrosPorPagina = 5;

  // Estado para pesquisa
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([...usuarios]);

  // Estado para o modal de adicionar usuário
  const [modalAdicionar, setModalAdicionar] = useState(false);
  
  // Estado para o modal de editar usuário
  const [modalEditar, setModalEditar] = useState(false);
  const [usuarioEmEdicao, setUsuarioEmEdicao] = useState(null);

  // Efeito para filtrar usuários quando o termo de pesquisa muda
  useEffect(() => {
    if (termoPesquisa.trim() === '') {
      setUsuariosFiltrados([...usuarios]);
    } else {
      const resultados = usuarios.filter(usuario => 
        usuario.nome.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
        usuario.email.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
        usuario.cargo.toLowerCase().includes(termoPesquisa.toLowerCase())
      );
      setUsuariosFiltrados(resultados);
    }
    // Voltar para a primeira página quando realizar uma pesquisa
    setPaginaAtual(1);
  }, [termoPesquisa, usuarios]);

  // Calcular total de páginas baseado nos resultados filtrados
  const totalPaginas = Math.ceil(usuariosFiltrados.length / registrosPorPagina);
  
  // Obter usuários da página atual
  const usuariosPaginados = usuariosFiltrados.slice(
    (paginaAtual - 1) * registrosPorPagina,
    paginaAtual * registrosPorPagina
  );

  // Funções de navegação de páginas
  const handlePaginacao = {
    irParaPaginaAnterior: () => {
      if (paginaAtual > 1) {
        setPaginaAtual(paginaAtual - 1);
      }
    },
    irParaProximaPagina: () => {
      if (paginaAtual < totalPaginas) {
        setPaginaAtual(paginaAtual + 1);
      }
    },
    irParaPagina: (numeroPagina) => {
      if (numeroPagina >= 1 && numeroPagina <= totalPaginas) {
        setPaginaAtual(numeroPagina);
      }
    }
  };

  // Função para lidar com mudanças no campo de pesquisa
  const handlePesquisaChange = (e) => {
    setTermoPesquisa(e.target.value);
  };

  // Função para adicionar um novo usuário
  const adicionarUsuario = (novoUsuario) => {
    if (novoUsuario.nome && novoUsuario.email && novoUsuario.cargo) {
      setUsuarios([
        ...usuarios,
        {
          id: usuarios.length + 1,
          ...novoUsuario
        }
      ]);
      setModalAdicionar(false);
    }
  };

  // Função para iniciar a edição de um usuário
  const iniciarEdicao = (usuario) => {
    setUsuarioEmEdicao({ ...usuario });
    setModalEditar(true);
  };

  // Função para salvar as alterações de um usuário editado
  const salvarEdicao = (usuarioEditado) => {
    if (usuarioEditado && usuarioEditado.nome && usuarioEditado.email && usuarioEditado.cargo) {
      setUsuarios(
        usuarios.map(usuario => 
          usuario.id === usuarioEditado.id ? usuarioEditado : usuario
        )
      );
      setModalEditar(false);
      setUsuarioEmEdicao(null);
    }
  };

  // Função para deletar um usuário
  const deletarUsuario = (id) => {
    setUsuarios(usuarios.filter(usuario => usuario.id !== id));
  };

  return (
    <SidebarWrapper>
      <div className="p-4 w-full bg-gray-50">
       

        <UsersTable
          usuarios={usuariosPaginados}
          iniciarEdicao={iniciarEdicao}
          deletarUsuario={deletarUsuario}
        />

        <UsersPagination
          paginaAtual={paginaAtual}
          totalPaginas={totalPaginas}
          usuariosFiltrados={usuariosFiltrados}
          registrosPorPagina={registrosPorPagina}
          handlePaginacao={handlePaginacao}
        />

        {modalAdicionar && (
          <AddUserModal
            setModalAdicionar={setModalAdicionar}
            adicionarUsuario={adicionarUsuario}
          />
        )}

        {modalEditar && usuarioEmEdicao && (
          <EditUserModal
            setModalEditar={setModalEditar}
            usuarioEmEdicao={usuarioEmEdicao}
            salvarEdicao={salvarEdicao}
          />
        )}
      </div>
    </SidebarWrapper>
  );
}