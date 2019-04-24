CREATE PROCEDURE Building_GetById(
	@Id int
)
AS
BEGIN
	SELECT [Id],
	[Name],
	[Street],
	[StreetNo],
	[PostCode],
	[IsActive]
	FROM [dbo].[Building]
	WHERE Id = @Id
END