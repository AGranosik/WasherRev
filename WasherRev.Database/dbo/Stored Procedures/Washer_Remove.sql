CREATE PROCEDURE Washer_Remove(
	@Id INT
)
AS
BEGIN
	UPDATE [dbo].[Washer]
	SET
	[IsActive] = 0
	WHERE Id = @Id
END