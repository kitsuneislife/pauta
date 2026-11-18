type Entrada = Record<string, unknown>;
type Resultado<T> = { dados: T; erro?: undefined } | { dados?: undefined; erro: string };

const texto = (valor: unknown) => (typeof valor === 'string' || typeof valor === 'number' ? String(valor).trim() : '');
const inteiro = (valor: unknown) => (Number.isInteger(Number(valor)) && Number(valor) > 0 ? Number(valor) : null);

export function validarPessoa(d: Entrada): Resultado<{ nome: string; cpf: string; email: string | null; dataNascimento: string | null }> {
	const nome = texto(d.nome);
	const cpf = texto(d.cpf).replace(/\D/g, '');
	const email = texto(d.email);
	const dataNascimento = texto(d.dataNascimento);
	if (!nome || nome.length > 150) return { erro: 'Informe o nome (até 150 caracteres).' };
	if (cpf.length !== 11) return { erro: 'O CPF precisa ter 11 dígitos.' };
	if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { erro: 'E-mail inválido.' };
	if (dataNascimento && Number.isNaN(Date.parse(dataNascimento))) return { erro: 'Data de nascimento inválida.' };
	return { dados: { nome, cpf, email: email || null, dataNascimento: dataNascimento || null } };
}

export function validarNoticia(d: Entrada): Resultado<{ titulo: string; conteudo: string; autorId: number; cidadeId: number }> {
	const titulo = texto(d.titulo);
	const conteudo = texto(d.conteudo);
	const autorId = inteiro(d.autorId);
	const cidadeId = inteiro(d.cidadeId);
	if (!titulo || titulo.length > 200) return { erro: 'Informe o título (até 200 caracteres).' };
	if (!conteudo) return { erro: 'Informe o conteúdo.' };
	if (!autorId) return { erro: 'Escolha o autor.' };
	if (!cidadeId) return { erro: 'Escolha a cidade.' };
	return { dados: { titulo, conteudo, autorId, cidadeId } };
}

export function erroDoBanco(e: unknown) {
	const codigo = (e as { cause?: { code?: string } })?.cause?.code ?? (e as { code?: string })?.code;
	if (codigo === '23505') return 'Já existe um registro com esse valor (CPF repetido?).';
	if (codigo === '23503') return 'Registro ligado a outros dados (ex.: pessoa com notícias).';
	throw e;
}
