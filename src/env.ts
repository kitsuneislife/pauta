import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	DATABASE_URL: { description: 'Conexão com o PostgreSQL.' },
	VIACEP_URL: {
		description: 'Base da API de CEP.',
		schema: (valor) => valor || 'https://viacep.com.br/ws'
	},
	PUBLIC_APP_NAME: {
		description: 'Nome exibido no topo do site.',
		public: true,
		schema: (valor) => valor || 'Pauta'
	}
});
