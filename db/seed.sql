INSERT INTO pais (nome, codigo_iso) VALUES ('Brasil', 'BRA') ON CONFLICT DO NOTHING;

INSERT INTO uf (nome, sigla, pais_id)
SELECT v.nome, v.sigla, p.id
FROM pais p, (VALUES
  ('Acre', 'AC'), ('Alagoas', 'AL'), ('Amapá', 'AP'), ('Amazonas', 'AM'), ('Bahia', 'BA'),
  ('Ceará', 'CE'), ('Distrito Federal', 'DF'), ('Espírito Santo', 'ES'), ('Goiás', 'GO'),
  ('Maranhão', 'MA'), ('Mato Grosso', 'MT'), ('Mato Grosso do Sul', 'MS'), ('Minas Gerais', 'MG'),
  ('Pará', 'PA'), ('Paraíba', 'PB'), ('Paraná', 'PR'), ('Pernambuco', 'PE'), ('Piauí', 'PI'),
  ('Rio de Janeiro', 'RJ'), ('Rio Grande do Norte', 'RN'), ('Rio Grande do Sul', 'RS'),
  ('Rondônia', 'RO'), ('Roraima', 'RR'), ('Santa Catarina', 'SC'), ('São Paulo', 'SP'),
  ('Sergipe', 'SE'), ('Tocantins', 'TO')
) AS v(nome, sigla)
WHERE p.codigo_iso = 'BRA'
ON CONFLICT DO NOTHING;

INSERT INTO cidade (nome, codigo_ibge, uf_id)
SELECT v.nome, v.ibge, u.id
FROM (VALUES
  ('São Paulo', 3550308, 'SP'), ('Curitiba', 4106902, 'PR'), ('Rio de Janeiro', 3304557, 'RJ')
) AS v(nome, ibge, sigla)
JOIN uf u ON u.sigla = v.sigla
ON CONFLICT DO NOTHING;

INSERT INTO pessoa (nome, cpf, email)
VALUES ('Redação Pauta', '00000000191', 'redacao@exemplo.com.br')
ON CONFLICT DO NOTHING;

INSERT INTO noticia (titulo, conteudo, autor_id, cidade_id)
SELECT 'Pauta no ar', 'Primeira notícia do sistema, criada pelo seed.', p.id, c.id
FROM pessoa p, cidade c
WHERE p.cpf = '00000000191' AND c.codigo_ibge = 3550308
  AND NOT EXISTS (SELECT 1 FROM noticia);
