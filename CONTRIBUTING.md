# **Contributing Guidelines (VOTEX)**

Thank you for considering contributing to **VoteX**! We welcome contributions that help improve the project, whether it's through code, documentation, bug reports, or feature requests. Please follow these guidelines to ensure a smooth collaboration.

## How to Contribute

1. **Fork the Repository**

   Start by forking the repository to your GitHub account.
   ```bash
   # Clone your fork to your local machine
   git clone https://github.com/your-username/online-voting-system.git
   cd online-voting-system
   ```
2. **Create a Branch**
     
      Create a new branch for your feature or bug fix.
      ```bash Copy code
      # Create and switch to a new branch
      git checkout -b feature/new-feature-name
      ```

3. **Make Your Changes**

      Make sure your code follows the project's coding style.
      ```bash
      # Stage your changes
      git add .
      # Commit with a clear message
      git commit -m "Add new feature: description of the feature"
      ```

      * Write clear and concise commit messages.
      *  Include comments where necessary to explain your code.
      * Ensure that your changes don't break the existing functionality.
        
4. **Testing**
   
   Test your changes thoroughly before submitting.
   ```bash 
   # Run tests (replace with actual command if available)
   npm test
   ```
    If you add new functionality, make sure to write tests that cover it.
5. **Submit a Pull Request** Push your branch to GitHub and open a pull request.
     ```bash Copy code
   # Push your branch to your forked repository
     git push origin feature/new-feature-name
    ```
  * Navigate to the original repository and open a pull request.
  * Provide a clear description of the changes you made and why.
6.  **Code Review**
    *  Address any feedback provided by maintainers.
    *  Make any necessary revisions to your pull request.
      
7.  **Merge**
     Once your pull request is approved, it will be merged into the main branch.
    ```bash
     # Sync your forked repository with the original repository
     git checkout main
     git pull upstream main
    ```
Congratulations, your contribution is now part of the project!

  # Reporting Issues 
  If you encounter any issues or bugs, please report them using GitHub Issues:
  ```bash Copy code 
  # Navigate to the Issues tab and click "New Issue"` 
  ```
  * Provide a clear title and detailed description of the issue.
  * Include steps to reproduce the problem if possible.
    
  # Feature Requests 
  We welcome new ideas and feature requests! To suggest a new feature:
  ```bash Copy code 
  # Navigate to the Issues tab and click "New Issue"`
  ```
  * Provide a clear title and detailed description of the feature.
  * Explain why this feature would be useful for the project.
    
  # Code Style 
  Please adhere to the existing code style and conventions used in the project. Consistency helps keep the codebase clean and maintainable.

  # Thank you for contributing to VoteX! Together, we can build a secure and reliable platform for voting.
