file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (LibraryModule SHARED ${SOURCES})

target_include_directories(LibraryModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(LibraryModule sc-memory)

add_dependencies(LibraryModule sc-memory)

sc_codegen(LibraryModule ${CMAKE_CURRENT_LIST_DIR})
