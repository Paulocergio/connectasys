"use client";
import React, { useState, useEffect } from 'react';
import SidebarWrapper from "@/components/ui/sidebar";
import { UserPlus, X, Trash2, Edit2, Search, UserCheck, Shield, Coffee, ChevronLeft, ChevronRight, UserCircle2 } from 'lucide-react';

const UsuariosContent = () => {
    // Estado para armazenar a lista de usuários
    const [usuarios, setUsuarios] = useState([
        { id: 11, nome: 'Ricardo Almeida', email: 'ricardo.almeida@empresa.com', cargo: 'Arquiteto de Software' },
        { id: 12, nome: 'Sofia Ribeiro', email: 'sofia.ribeiro@empresa.com', cargo: 'Desenvolvedora Mobile' },
        { id: 13, nome: 'Marcelo Farias', email: 'marcelo.farias@empresa.com', cargo: 'DevOps Engineer' },
        { id: 14, nome: 'Tatiane Lopes', email: 'tatiane.lopes@empresa.com', cargo: 'Product Manager' },
        { id: 15, nome: 'André Cunha', email: 'andre.cunha@empresa.com', cargo: 'Desenvolvedor Full Stack' },
        { id: 16, nome: 'Bianca Ferreira', email: 'bianca.ferreira@empresa.com', cargo: 'Analista de BI' },
        { id: 17, nome: 'Gabriel Rocha', email: 'gabriel.rocha@empresa.com', cargo: 'Cientista de Dados' },
        { id: 18, nome: 'Patrícia Nunes', email: 'patricia.nunes@empresa.com', cargo: 'Agile Coach' },
        { id: 19, nome: 'Fábio Cardoso', email: 'fabio.cardoso@empresa.com', cargo: 'Engenheiro de Dados' },
        { id: 20, nome: 'Larissa Teixeira', email: 'larissa.teixeira@empresa.com', cargo: 'Especialista em Segurança' },
        { id: 21, nome: 'Diego Martins', email: 'diego.martins@empresa.com', cargo: 'Desenvolvedor Frontend' },
        { id: 22, nome: 'Isabela Moraes', email: 'isabela.moraes@empresa.com', cargo: 'Tech Recruiter' },
        { id: 23, nome: 'Vinícius Barros', email: 'vinicius.barros@empresa.com', cargo: 'Suporte Técnico' },
        { id: 24, nome: 'Elaine Pires', email: 'elaine.pires@empresa.com', cargo: 'Analista de Requisitos' },
        { id: 25, nome: 'Rafael Lima', email: 'rafael.lima@empresa.com', cargo: 'CTO' },
        { id: 26, nome: 'Melissa Souza', email: 'melissa.souza@empresa.com', cargo: 'Coordenadora de Projetos' },
        { id: 27, nome: 'Henrique Batista', email: 'henrique.batista@empresa.com', cargo: 'Engenheiro de QA' },
        { id: 28, nome: 'Cristina Carvalho', email: 'cristina.carvalho@empresa.com', cargo: 'Desenvolvedora Frontend' },
        { id: 29, nome: 'Otávio Mendes', email: 'otavio.mendes@empresa.com', cargo: 'SysAdmin' },
        { id: 30, nome: 'Daniela Monteiro', email: 'daniela.monteiro@empresa.com', cargo: 'Gerente de Produto' }
    ]);
    
    
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
    const irParaPaginaAnterior = () => {
        if (paginaAtual > 1) {
            setPaginaAtual(paginaAtual - 1);
        }
    };

    const irParaProximaPagina = () => {
        if (paginaAtual < totalPaginas) {
            setPaginaAtual(paginaAtual + 1);
        }
    };

    const irParaPagina = (numeroPagina) => {
        if (numeroPagina >= 1 && numeroPagina <= totalPaginas) {
            setPaginaAtual(numeroPagina);
        }
    };

    // Função para lidar com mudanças no campo de pesquisa
    const handlePesquisaChange = (e) => {
        setTermoPesquisa(e.target.value);
    };

    // Estado para o novo usuário
    const [novoUsuario, setNovoUsuario] = useState({
        nome: '',
        email: '',
        cargo: ''
    });

    // Função para adicionar um novo usuário
    const adicionarUsuario = () => {
        if (novoUsuario.nome && novoUsuario.email && novoUsuario.cargo) {
            setUsuarios([
                ...usuarios,
                {
                    id: usuarios.length + 1,
                    ...novoUsuario
                }
            ]);
            // Limpar o formulário
            setNovoUsuario({ nome: '', email: '', cargo: '' });
            // Fechar o modal
            setModalAdicionar(false);
        }
    };

    // Função para iniciar a edição de um usuário
    const iniciarEdicao = (usuario) => {
        setUsuarioEmEdicao({ ...usuario });
        setModalEditar(true);
    };

    // Função para salvar as alterações de um usuário editado
    const salvarEdicao = () => {
        if (usuarioEmEdicao && usuarioEmEdicao.nome && usuarioEmEdicao.email && usuarioEmEdicao.cargo) {
            setUsuarios(
                usuarios.map(usuario => 
                    usuario.id === usuarioEmEdicao.id ? usuarioEmEdicao : usuario
                )
            );
            setModalEditar(false);
            setUsuarioEmEdicao(null);
        }
    };

    // Função para atualizar os campos do novo usuário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNovoUsuario({
            ...novoUsuario,
            [name]: value
        });
    };

    // Função para atualizar os campos do usuário em edição
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setUsuarioEmEdicao({
            ...usuarioEmEdicao,
            [name]: value
        });
    };

    // Função para deletar um usuário
    const deletarUsuario = (id) => {
        setUsuarios(usuarios.filter(usuario => usuario.id !== id));
    };

    // Função para obter o ícone do cargo
    const getCargoIcon = (cargo) => {
        switch(cargo.toLowerCase()) {
            case 'desenvolvedor frontend':
            case 'desenvolvedora frontend':
            case 'desenvolvedor backend':
            case 'desenvolvedora backend':
            case 'engenheiro de software':
            case 'engenheira de software':
                return <Coffee className="h-4 w-4 mr-1" />;
            case 'ux researcher':
            case 'designer':
                return <Edit2 className="h-4 w-4 mr-1" />;
            case 'product owner':
            case 'tech lead':
            case 'scrum master':
                return <Shield className="h-4 w-4 mr-1" />;
            default:
                return <UserCheck className="h-4 w-4 mr-1" />;
        }
    };

    // Função para obter a cor do badge baseado no cargo
    const getCargoColor = (cargo) => {
        const cargoLower = cargo.toLowerCase();
        if (cargoLower.includes('desenvolvedor') || cargoLower.includes('desenvolvedora') || cargoLower.includes('engenheiro') || cargoLower.includes('engenheira')) {
            return 'bg-indigo-100 text-indigo-800';
        } else if (cargoLower.includes('ux') || cargoLower.includes('designer')) {
            return 'bg-pink-100 text-pink-800';
        } else if (cargoLower.includes('product') || cargoLower.includes('lead') || cargoLower.includes('master')) {
            return 'bg-amber-100 text-amber-800';
        } else if (cargoLower.includes('qa') || cargoLower.includes('test')) {
            return 'bg-purple-100 text-purple-800';
        } else if (cargoLower.includes('dados') || cargoLower.includes('analista')) {
            return 'bg-blue-100 text-blue-800';
        } else {
            return 'bg-emerald-100 text-emerald-800';
        }
    };

    // Função para gerar um gradiente de cor para o avatar baseado no nome do usuário
    const getAvatarGradient = (nome) => {
        const hash = nome.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const gradients = [
            'from-purple-500 to-indigo-600',
            'from-blue-500 to-teal-500',
            'from-green-500 to-emerald-600',
            'from-yellow-500 to-orange-600',
            'from-pink-500 to-rose-600',
            'from-indigo-500 to-blue-600',
            'from-red-500 to-pink-600',
            'from-teal-500 to-cyan-600',
            'from-orange-500 to-amber-600',
            'from-cyan-500 to-blue-600',
        ];
        return gradients[hash % gradients.length];
    };

    // Função para obter as iniciais do nome do usuário
    const getIniciais = (nome) => {
        return nome.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    };

    return (
        <SidebarWrapper>
            <div className="p-4 w-full bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Gerenciamento de Usuários</h1>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Buscar usuários..." 
                                value={termoPesquisa}
                                onChange={handlePesquisaChange}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all w-64"
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        </div>
                        <button
                            onClick={() => setModalAdicionar(true)}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700"
                        >
                            <UserPlus size={18} />
                            <span>Novo Usuário</span>
                        </button>
                    </div>
                </div>

                {/* Lista de usuários com design moderno e elegante */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full border border-gray-100">
                    <div className="overflow-x-auto w-full">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cargo</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {usuariosPaginados.map((usuario) => (
                                    <tr key={usuario.id} className="hover:bg-blue-50 transition-colors">
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className={`flex-shrink-0 h-12 w-12 bg-gradient-to-br ${getAvatarGradient(usuario.nome)} rounded-full flex items-center justify-center text-white font-bold shadow-md`}>
                                                    {getIniciais(usuario.nome)}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-semibold text-gray-900">{usuario.nome}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <div className="text-sm text-gray-500 p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                                                {usuario.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <span className={`px-3 py-1.5 inline-flex items-center text-xs font-medium rounded-full ${getCargoColor(usuario.cargo)}`}>
                                                {getCargoIcon(usuario.cargo)}
                                                {usuario.cargo}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-3">
                                                <button 
                                                    onClick={() => iniciarEdicao(usuario)}
                                                    className="text-blue-600 hover:text-blue-900 bg-blue-50 p-2 rounded-full hover:bg-blue-100 transition-all"
                                                    title="Editar usuário"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => deletarUsuario(usuario.id)}
                                                    className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full hover:bg-red-100 transition-all"
                                                    title="Excluir usuário"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Componente de paginação */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            {usuariosFiltrados.length > 0 ? (
                                <>Mostrando {((paginaAtual - 1) * registrosPorPagina) + 1} a {Math.min(paginaAtual * registrosPorPagina, usuariosFiltrados.length)} de {usuariosFiltrados.length} registros</>
                            ) : (
                                <>Nenhum registro encontrado</>
                            )}
                        </div>
                        
                        {usuariosFiltrados.length > 0 && (
                            <div className="flex items-center space-x-2">
                                <button 
                                    onClick={irParaPaginaAnterior} 
                                    disabled={paginaAtual === 1}
                                    className={`p-2 rounded-lg flex items-center justify-center ${paginaAtual === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                
                                {/* Botões de números de páginas */}
                                {[...Array(totalPaginas)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => irParaPagina(index + 1)}
                                        className={`w-8 h-8 rounded-lg text-sm flex items-center justify-center ${
                                            paginaAtual === index + 1 
                                                ? 'bg-blue-600 text-white' 
                                                : 'text-gray-600 hover:bg-blue-100'
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                
                                <button 
                                    onClick={irParaProximaPagina} 
                                    disabled={paginaAtual === totalPaginas}
                                    className={`p-2 rounded-lg flex items-center justify-center ${paginaAtual === totalPaginas ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Modal para adicionar usuário */}
                {modalAdicionar && (
                    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl border border-gray-100 animate-fadeIn">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-10 h-10 rounded-full flex items-center justify-center text-white">
                                        <UserPlus size={20} />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800">Adicionar Novo Usuário</h2>
                                </div>
                                <button 
                                    onClick={() => setModalAdicionar(false)}
                                    className="text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-all"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                                    <input
                                        type="text"
                                        name="nome"
                                        value={novoUsuario.nome}
                                        onChange={handleChange}
                                        placeholder="Digite o nome completo"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={novoUsuario.email}
                                        onChange={handleChange}
                                        placeholder="Digite o email"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                                    <input
                                        type="text"
                                        name="cargo"
                                        value={novoUsuario.cargo}
                                        onChange={handleChange}
                                        placeholder="Digite o cargo"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            
                            <div className="mt-8 flex justify-end gap-3">
                                <button
                                    onClick={() => setModalAdicionar(false)}
                                    className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={adicionarUsuario}
                                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-md"
                                >
                                    Salvar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal para editar usuário */}
                {modalEditar && usuarioEmEdicao && (
                    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl border border-gray-100 animate-fadeIn">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-2">
                                    <div className={`w-10 h-10 bg-gradient-to-br ${getAvatarGradient(usuarioEmEdicao.nome)} rounded-full flex items-center justify-center text-white font-bold`}>
                                        {getIniciais(usuarioEmEdicao.nome)}
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800">Editar Usuário</h2>
                                </div>
                                <button 
                                    onClick={() => setModalEditar(false)}
                                    className="text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-all"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                                    <input
                                        type="text"
                                        name="nome"
                                        value={usuarioEmEdicao.nome}
                                        onChange={handleEditChange}
                                        placeholder="Digite o nome completo"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={usuarioEmEdicao.email}
                                        onChange={handleEditChange}
                                        placeholder="Digite o email"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                                    <input
                                        type="text"
                                        name="cargo"
                                        value={usuarioEmEdicao.cargo}
                                        onChange={handleEditChange}
                                        placeholder="Digite o cargo"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            
                            <div className="mt-8 flex justify-end gap-3">
                                <button
                                    onClick={() => setModalEditar(false)}
                                    className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={salvarEdicao}
                                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-md"
                                >
                                    Salvar Alterações
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </SidebarWrapper>
    );
};

export default UsuariosContent;