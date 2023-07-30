
using Google.Apis.Auth.OAuth2;
/// <summary>
/// Retrieves the Google Application Credentials from the environment variable, which can be either a path to a JSON-file or the JSON itself.
/// </summary>
public class GoogleApplicationCredentialsRetriever
{
    const string GOOGLE_APPLICATION_CREDENTIALS = "GOOGLE_APPLICATION_CREDENTIALS";

    public GoogleCredential Retrieve()
    {
        string credentialsVariable = Environment.GetEnvironmentVariable(GOOGLE_APPLICATION_CREDENTIALS)
            ?? throw new InvalidOperationException($"Environment variable {GOOGLE_APPLICATION_CREDENTIALS} not found.");

        var fileValidator = new FileValidator();
        if (fileValidator.IsValidPath(credentialsVariable))
        {
            return GoogleCredential.FromFile(credentialsVariable);
        }
        string trimmed = TrimDoubleQuotes(credentialsVariable);

        return GoogleCredential.FromJson(trimmed);
    }

    private string TrimDoubleQuotes(string variable)
    {
        return variable[0] == '\"' && variable[^1] == '\"'
            ? variable.Substring(1, variable.Length - 2)
            : variable;
    }
}