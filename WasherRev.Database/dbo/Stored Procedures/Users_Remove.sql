	CREATE PROCEDURE Users_Remove(
		@Id INT
	)
	AS
	BEGIN
		UPDATE [dbo].[Users]
		SET 
			[IsActive] = 0
		WHERE Id = @Id
	END