CREATE PROCEDURE Building_Remove(
	@Id INT
)
AS
BEGIN
	UPDATE [dbo].[Building]
	SET IsActive = 0
	WHERE Id = @Id
END