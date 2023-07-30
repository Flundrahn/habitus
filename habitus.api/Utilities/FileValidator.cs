public class FileValidator
{
    public bool IsValidPath(string path)
    {
        if (!Path.IsPathRooted(path))
        {
            return false;
        }

        if (path.IndexOfAny(Path.GetInvalidPathChars()) > -1)
        {
            return false;
        }

        if (!File.Exists(path))
        {
            return false;
        }

        return true;
    }
}
