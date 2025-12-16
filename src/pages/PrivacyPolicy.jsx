export default function PrivacyPolicy() {
  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: "0 20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Política de Privacidade — Prontfy</h1>

      <p>
        A sua privacidade é importante para nós. Esta Política de Privacidade
        descreve como o Prontfy coleta, usa e protege as informações dos usuários.
      </p>

      <h2>1. Informações que coletamos</h2>
      <p>
        Ao utilizar o login social (Google ou Facebook), podemos coletar as
        seguintes informações básicas:
      </p>
      <ul>
        <li>Nome</li>
        <li>Endereço de e-mail</li>
        <li>Foto de perfil (quando fornecida pelo provedor)</li>
      </ul>

      <h2>2. Uso das informações</h2>
      <p>
        As informações coletadas são utilizadas exclusivamente para:
      </p>
      <ul>
        <li>Autenticar o usuário no sistema</li>
        <li>Permitir acesso às funcionalidades do Prontfy</li>
        <li>Melhorar a experiência do usuário</li>
      </ul>

      <h2>3. Compartilhamento de dados</h2>
      <p>
        O Prontfy não vende, não aluga e não compartilha dados pessoais dos
        usuários com terceiros, exceto quando exigido por lei.
      </p>

      <h2>4. Armazenamento e segurança</h2>
      <p>
        Utilizamos práticas de segurança adequadas para proteger as informações
        dos usuários contra acesso não autorizado, alteração ou divulgação.
      </p>

      <h2>5. Exclusão de dados</h2>
      <p>
        O usuário pode solicitar a exclusão dos seus dados pessoais a qualquer
        momento enviando um e-mail para:
      </p>
      <p>
        <strong>contato@prontfy.com.br</strong>
      </p>

      <h2>6. Alterações nesta política</h2>
      <p>
        Esta política pode ser atualizada periodicamente. Recomendamos que o
        usuário revise este documento regularmente.
      </p>

      <h2>7. Contato</h2>
      <p>
        Em caso de dúvidas sobre esta Política de Privacidade, entre em contato
        pelo e-mail:
      </p>
      <p>
        <strong>contato@prontfy.com.br</strong>
      </p>

      <p style={{ marginTop: 40, fontSize: 14, color: "#555" }}>
        Última atualização: {new Date().toLocaleDateString("pt-BR")}
      </p>
    </main>
  );
}
