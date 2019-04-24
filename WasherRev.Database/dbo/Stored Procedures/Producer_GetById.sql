CREATE PROCEDURE Producer_GetById(
	@Id int
)
AS
BEGIN
	SELECT
	[Id],
	[Name],
	[ServicePhoneNo]
	FROM [dbo].[Producer]
	WHERE Id = @Id
END