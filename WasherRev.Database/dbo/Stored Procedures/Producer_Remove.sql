CREATE PROCEDURE Producer_Remove(
	@Id int
)
AS
BEGIN
	DELETE FROM [dbo].[Producer]
	WHERE Id = @Id
END