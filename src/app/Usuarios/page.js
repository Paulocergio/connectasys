"use client";

import React, { useState, useEffect } from 'react';
import SidebarWrapper from "@/components/ui/sidebar";
import UsersTable from './UsersTable';
import UsersPagination from './UsersPagination';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';

export default function Page() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const registrosPorPagina = 5;
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [modalAdicionar, setModalAdicionar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [usuarioEmEdicao, setUsuarioEmEdicao] = useState(null);

  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        const data = [];
        setUsuarios(data);
        setUsuariosFiltrados(data);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      } finally {
        setCarregando(false);
      }
    };

    carregarUsuarios();
  }, []);

  useEffect(() => {
    if (termoPesquisa.trim() === '') {
      setUsuariosFiltrados([...usuarios]);
    } else {
      const resultados = usuarios.filter(usuario => 
        usuario.name.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
        usuario.email.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
        usuario.role.toLowerCase().includes(termoPesquisa.toLowerCase())
      );
      setUsuariosFiltrados(resultados);
    }
    setPaginaAtual(1);
  }, [termoPesquisa, usuarios]);

  const totalPaginas = Math.ceil(usuariosFiltrados.length / registrosPorPagina);
  const usuariosPaginados = usuariosFiltrados.slice(
    (paginaAtual - 1) * registrosPorPagina,
    paginaAtual * registrosPorPagina
  );

  const handlePaginacao = {
    irParaPaginaAnterior: () => paginaAtual > 1 && setPaginaAtual(paginaAtual - 1),
    irParaProximaPagina: () => paginaAtual < totalPaginas && setPaginaAtual(paginaAtual + 1),
    irParaPagina: (numeroPagina) => {
      if (numeroPagina >= 1 && numeroPagina <= totalPaginas) {
        setPaginaAtual(numeroPagina);
      }
    }
  };

  const adicionarUsuario = (novoUsuario) => {
    const novoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    const usuarioCompleto = { id: novoId, ...novoUsuario };
    setUsuarios([...usuarios, usuarioCompleto]);
    setModalAdicionar(false);
  };

  const iniciarEdicao = (usuario) => {
    setUsuarioEmEdicao(usuario);
    setModalEditar(true);
  };

  const salvarEdicao = (usuarioEditado) => {
    setUsuarios(usuarios.map(u => u.id === usuarioEditado.id ? usuarioEditado : u));
    setModalEditar(false);
  };

  const deletarUsuario = (id) => {
    setUsuarios(usuarios.filter(u => u.id !== id));
  };

  return (
    <SidebarWrapper>
      <div className="p-4 w-full bg-gray-50">
        {carregando ? (
          <div>Carregando usuários...</div>
        ) : (
          <>
            <UsersTable
              usuarios={usuariosPaginados.map(usuario => ({ ...usuario, id: usuario.id.toString() }))}
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
          </>
        )}

        <AddUserModal
          isOpen={modalAdicionar}
          onClose={() => setModalAdicionar(false)}
          onSave={adicionarUsuario}
        />

        <EditUserModal
          isOpen={modalEditar}
          onClose={() => setModalEditar(false)}
          usuario={usuarioEmEdicao}
          onSave={salvarEdicao}
        />
      </div>
    </SidebarWrapper>
  );
}